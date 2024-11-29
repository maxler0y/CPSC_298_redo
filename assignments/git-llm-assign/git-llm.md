# Git-LLM Assignment

This directory contains files and scripts for automating Git commit messages using an LLM. The assignment uses XML templates and scripts to streamline the process of generating descriptive commit messages.

---

## Files in This Directory
1. **`git-commit-prompt.xml`**:
   - Contains the XML structure for the LLM prompt.
   - The prompt instructs the LLM to analyze a Git diff and generate an appropriate commit message.
   - Key parts of the prompt:
     - **System Role**: Defines the LLM as a helpful AI for Git commits.
     - **User Input**: Dynamically includes the Git diff.

2. **`git-llm.sh`**:
   - A Bash script that:
     - Retrieves the current Git diff.
     - Sends the diff to the LLM using the `llm` CLI tool.
     - Outputs the generated commit message to the terminal.
   - The script uses the XML prompt file for consistent and structured input.

3. **`README.md`**:
   - Documentation for the `git-llm` assignment, explaining its purpose, usage, and setup.

## Pre-requisites
1. Install the `llm` CLI tool:
   ```bash
   pip install llm

