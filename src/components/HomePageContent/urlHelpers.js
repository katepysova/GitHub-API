const urlHelpers = {
  generateGetIssuesUrl: (owner, repo) =>
    `https://api.github.com/repos/${owner}/${repo}/issues?&state=all`,
  generateOwnerUrl: (owner) => `https://github.com/${owner}`,
  generateGetStarsUrl: (owner, repo) => `https://api.github.com/repos/${owner}/${repo}/stargazers`,
  generateRepoUrl: function (owner, repo) {
    return `${this.generateOwnerUrl(owner)}/${repo}`;
  }
};

export default urlHelpers;
