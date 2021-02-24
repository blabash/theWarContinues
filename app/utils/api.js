import { andThen, pipe, prop, sortBy, reduce, bind, ap, tap } from 'ramda';

function getErrorMsg(message, username) {
  if (message === 'Not Found') {
    return `${username} doesn't exist`;
  }

  return message;
}

function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username));
      }

      return profile;
    });
}

function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos`)
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMsg(repos.message, username));
      }

      return repos;
    });
}

const getStarCount = reduce(
  (count, { stargazers_count }) => count + stargazers_count,
  0
);

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

const calculateProfileScores = (list) => {
  const profiles = list.slice(0, list.length / 2);
  const repos = list.slice(list.length / 2);

  return profiles.map((profile, idx) => ({
    profile,
    score: calculateScore(profile.followers, repos[idx]),
  }));
};

const log = bind(console.log, console);

export const battle = pipe(
  ap([getProfile, getRepos]),
  bind(Promise.all, Promise), //Equivalent to (promises) => Promise.all(promises)
  andThen(calculateProfileScores),
  andThen(sortBy(prop('score')))
);

export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
}
