import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { getSalesforceToken } from "../util/token_manager.ts";

// Function definition
export const WeeklyReportFunction = DefineFunction({
  callback_id: "weekly_report",
  title: "Weekly Report",
  description: "pulls Salesforce data to generate an appealing weekly report",
  source_file: "functions/weekly_report_function.ts",
  input_parameters: {
    properties: {
      salesforce_data: {
        type: Schema.types.string,
        description: "salesforce's report flow",
      },
    },
    required: ["salesforce_data"],
  },
  output_parameters: {
    properties: {
      summary_report: {
        type: Schema.types.string,
        description: "An AI summary of the report",
      },
    },
    required: ["summary_report"],
  },
});

// Function logic
export default SlackFunction(
  WeeklyReportFunction,
  async ({ inputs, env }) => {
    let AISummary = "";

    try {
      const body = JSON.stringify({
        prompt:
          `summarize the following text ${inputs.salesforce_data} to sound like a report and answer following the structure below for each item. Note that the following template format is mandatory, and you need to interpret the h2 tags. If there's no data on a specific section, do not add the section. If there's no data in a field, do not add the empty field for that item.

          📌 What's relevant
          Provide a small summary of what happened during the week, that's relevant and sounds like a report.

          🎯 Opportunities update

          Opportunity:
          Probability:
          Amount:

          📅 Events Update

          Event:
          Description:
          Date

          💼 Tasks

          Task:
          Priority:
          Status:
          Due date:`,
      });

      const token = await getSalesforceToken();

      if (!token) {
        throw new Error("Failed to retrieve Salesforce access token.");
      }

      const response = await fetch(
        env.SALESFORCE_API_URL,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-sfdc-app-context": "EinsteinGPT",
            "x-client-feature-id": "ai-platform-models-connected-app",
          },
          body: body,
        },
      );

      // Parse the response JSON
      const responseData = await response.json();
      AISummary = responseData.generation?.generatedText || "null";
    } catch (error) {
      console.error("Error making Salesforce API call:", error);
    }

    return {
      outputs: {
        summary_report: AISummary,
      },
    };
  },
);
