## **Follow below steps to setup CircleCI**

* First signup in Circle CI and connect a github repository to it.

* Then run “ssh-keygen -t ed25519 -f  ./ project_key -C <email>” command to generate public and private keys.

* Search and open the "project_key.pub" file to find the private key

* Copy the private key and add it in git repository -> settings -> deploy keys -> Add deploy key. (Don’t forget to check Allow write access while adding deploy key)

* Search and open the "project_key" file to find the public key

* Copy the entire file content and add it to the Circle CI.

* It can be added to CircleCI even after connecting it to the github by adding it in project settings -> SSH Keys with github.com as the hostname.

CircleCI Project URL: https://app.circleci.com/pipelines/circleci/J28vvjC6dXq9JVcPS9bLyb/9oWtLmbj6MoZGZPWpzPr3Q


![image](https://github.com/PSDApollo/ExpenseManagementSystem/assets/147103288/f6f29213-4a06-462d-9e4a-10cc1c86d4af)
