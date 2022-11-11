# delta-dev-dashboard

SW스타랩 &lt;3차원 기하 모델 프로세싱 프레임워크 개발> 개발 상황판

## 필요한 Redis 설정
```bash
SET api-key '"TEST_API_KEY"'
SET github-token '"TEST_GITHUB_TOKEN"'
SET project:title '"PROJECT_TITLE"'
SET project:due-date '"2019-01-01T09:00:00Z"'
SET project:start-date '"2019-01-01T09:00:00Z"'
SET repositories '["kaist-gclab/delta-dev-dashboard", "kaist-gclab/delta"]'
SET github-targets-begin '{"Repositories":0, "Stargazers":0, "Commits":0, "Contributors":0}'
SET github-targets-end '{"Repositories":1, "Stargazers":1, "Commits":1, "Contributors":1}'
GET github-statistics
```

## 예제 응답
```json
{
  "currentInstant": "2019-08-01T15:00:33.6880463Z",
  "projectTitle": "PROJECT_TITLE",
  "projectStartDate": "2019-05-01T09:00:00Z",
  "projectDueDate": "2019-12-01T09:00:00Z",
  "repositories": [
    "example/example-a",
    "example/example-b"
  ],
  "gitHubStatistics": {
    "repositories": 2,
    "details": [
      {
        "name": "example/example-a",
        "commits": 10,
        "stargazers": 3,
        "contributors": 5
      },
      {
        "name": "example/example-b",
        "commits": 5,
        "stargazers": 1,
        "contributors": 1
      }
    ],
    "updated": "2019-07-30T14:00:00.0000391Z",
    "isComplete": true,
    "contributors": 5
  },
  "gitHubTargetsBegin": {
    "repositories": 0,
    "commits": 0,
    "stargazers": 0,
    "contributors": 0
  },
  "gitHubTargetsEnd": {
    "repositories": 3,
    "commits": 100,
    "stargazers": 10,
    "contributors": 10
  }
}
```
