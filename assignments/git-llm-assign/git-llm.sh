#!/bin/bash
diff=$(git diff)
llm --system "You are a helpful AI that writes descriptive and concise commit messages for git repositories. Create a git commit message for the following changes: $diff" --model gpt-4

