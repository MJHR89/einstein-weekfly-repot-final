This function is designed to be used within the Slack Workflow Builder. The function reads Salesforce data and then makes an API call to OpenAI to format this data and summarize it. The summary is then saved as an output variable. 

# Building Conversational AI Apps in Slack
This is a project used for demonstration purposes for the Building modular Slack apps: Integrating generative AI workshop.

## Workshop Setup
Download the Slack CLI
Install the Slack CLI - Instructions Paste this command into your Mac terminal or Windows PowerShell to install the Slack CLI: Mac: curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh | bash Windows: irm https://downloads.slack-edge.com/slack-cli/install-windows.ps1 | iex

**Windows users!**
You may need to upgrade Powershell to work with the Slack CLI:
  One liner to install Powershell 7:
  - Open Powershell
  - Paste the following to install Powershell 7:
    `iex "& { $(irm https://aka.ms/install-powershell.ps1) } -UseMSI"`

**Learn more:**
  [Install Powershell on Windows (Microsoft)](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4&WT.mc_id=THOMASMAURER-blog-thmaure#install-powershell-using-winget-recommended)
  [How to install or update Powershell 6](https://www.thomasmaurer.ch/2019/03/how-to-install-and-update-powershell-6/)

## Download VSCode
The CLI is optimized to work with this editor, so we highly recommend using it (even if you typically use something else).

## Test in a workspace
Free sandboxes to test your app available by signing up to the developer program. Plus so much more support and developer tools! Grab yours here!

## Create a Personal Channel for Testing
In your workspace, create a channel named testing-yourName

## OpenAI keys
You can create them here.

## Clone the Template
Start by cloning this repository, to build at your own rhythm:

```
# Clone this project onto your machine
$ slack create my-app -t MJHR89/generate-weekly-report-workshop

# Change into the project directory
$ cd my-app
```

# JOIN THE DEVELOPER PROGRAM
Sign up for the developer program [here](https://api.slack.com/developer-program)! Events, newsletter, sandboxes, and so much more!!