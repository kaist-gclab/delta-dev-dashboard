# [비공개] delta-dev-dashboard

SW스타랩 &lt;3차원 기하 모델 프로세싱 프레임워크 개발> 개발 상황판

## 필요한 Redis 설정
```bash
SET api-key '"TEST_API_KEY"'
SET github-token '"TEST_GITHUB_TOKEN"'
SET project:title '"PROJECT_TITLE"'
SET project:due-date '"2019-01-01T09:00:00Z"'
SET project:start-date '"2019-01-01T09:00:00Z"'
SET repositories '["kaist-gclab/delta-dev-dashboard", "kaist-gclab/delta"]'
SET github-targets '{"Repositories":1, "Stargazers":1, "Commits":1, "Contributors":1}'
GET github-statistics
```
