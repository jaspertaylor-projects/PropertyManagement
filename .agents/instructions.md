# The Golden Rules

These are the golden rules that you absolutley must follow :

1. Use Playwright tools to simulate user experiences after you implement a
   change. Keep in mind that the data load is through electron etc so you wont
   be able to actually load data through the web.

2. Label every div so that we can communicate clearer

3. After every time before you finish and with a prompt, update .gitignore if
   applicable, and then commit to the local branch you are working on with a
   detailed commit message.

4. Keep the code base modular don't write code files longer than 600 lines long
   and refactor files you find that are longert than that.

5. Update the relevant docs after any change if you have anything worthy of
   updating docs. Don't be shy about making more docs if necessary.

6. Write code that is meant to be a base to grow from this project is still in
   its infancy and we need to make sure everything is being written with future
   growth in mind

7. Write a human-to-do.md file that gives celear step bby step instructions for
   a human to set up what is neccessary.
