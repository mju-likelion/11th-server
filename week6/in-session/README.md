# 현장의 소리

[멋사-6주차-세션.pdf](멋사-6주차-세션.pdf)

과제

- 다음 표 보고 스키마 짜보고 typeorm으로 구현해보기

  ### USER

  | ID     | email | pw | username | createdAT | updatedAT |
  |--------|-------|----|----------|-----------|-----------|
  | `<PK>` |       |    |          |           |           |

  ### POST

  | ID     | content | userID | createdAt | updatedAt |
  |--------|---------|--------|-----------|-----------|
  | `<PK>` |         | `<FK>` |           |           |

  ### COMMENT

  | ID     | writerId | postId | content |
  |--------|----------|--------|---------|
  | `<PK>` | `<FK>`   | `<FK>` |         |
