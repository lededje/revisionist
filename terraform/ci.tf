resource "aws_iam_user" "ci" {
  name          = "ci"
  path          = "/"
  force_destroy = true

  tags = {
    Project = "revisionist"
  }
}

resource "aws_iam_policy_attachment" "ci_push" {
  name       = "ci_ecr_push"
  users      = ["${aws_iam_user.ci.name}"]
  policy_arn = aws_iam_policy.ecr_push.arn
}

resource "aws_iam_policy_attachment" "ci_deploy" {
  name       = "ci_ecs_deploy"
  users      = ["${aws_iam_user.ci.name}"]
  policy_arn = aws_iam_policy.ecs_deploy.arn
}

resource "aws_iam_policy" "ecr_push" {
  name        = "ElasticContainerRegistryPush"
  path        = "/"
  description = "A policy that allows containers and layers to be pushed to repositories"

  policy = data.aws_iam_policy_document.ecr_push.json
}

data "aws_iam_policy_document" "ecr_push" {
  statement {
    actions = [
      "ecr:UploadLayerPart",
      "ecr:PutImage",
      "ecr:GetAuthorizationToken",
      "ecr:InitiateLayerUpload",
      "ecr:CompleteLayerUpload",
      "ecr:BatchCheckLayerAvailability"
    ]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "ecs_deploy" {
  name        = "ElasticContainerServiceDeploy"
  path        = "/"
  description = "A policy that allows task definitions to be updated"

  policy = data.aws_iam_policy_document.ecs_deploy.json
}

data "aws_iam_policy_document" "ecs_deploy" {
  statement {
    actions = [
      "ecs:UpdateService",
      "ecs:DescribeServices",
      "ecs:DescribeTaskDefinition",
      "ecs:RegisterTaskDefinition",
      "iam:PassRole"
    ]
    resources = ["*"]
  }
}
