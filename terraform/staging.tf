module "staging" {
  source = "./modules/revisionist"

  domain      = "staging.revisionist.dev"
  environment = "staging"

  db_username = var.db_username

  max_size         = 2
  min_size         = 1
  desired_capacity = 1
  instance_type    = "t3.small"
  key_name         = aws_key_pair.staging.key_name
}

resource "aws_key_pair" "staging" {
  key_name   = "yubi-key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDmK3Y66h/22Ckg1jzHdXlVTCevjrOsUyH0syiMflvHbi9eFUki07vuiPzmZP6YRAgZXqdv+p3bQS6QeWbGv1EGxiBToaz2uDaElEkQdel+pLPrK7jsrh3d8quqZv8HMXut3UHI1WytjBnB9jPgVplR7+W+2+psABHuAR9W0+2l/60ktMDYZkTw6RkPNuCudYQDN0ObzrljoE+nVKsPf8Zqen/izRq/MWLJhbfYiJ5OBobnz2aH8i6lrvOGQE40ntKdo/34i3S+CcYbhW3ZiAGFjrG4FnpamdyS1C7BXeIKz2cRtbGVXaAlkCfcTp3M+4Mfjzrk05AbZQFePDtsfIdKhH80hfoYhe8t+6MdnQ1xM4k6D8Noju2aAc3QJOyNesMTOu7EoTcHr2OwjndGrdaUVMcM3lidZ/cszBPUQ8tt0zwaPPfZHSZfM5C7qvhVhJBPpNVayZMlEEroisj3N+kB9Q1hauMrXmBrzK85Rlfx/5+S4i/whSWMsJO5RuXOgrcDEPf/RsHA3O9PfDUaPmjjvMckcbmEIX++NrU90mrQUrz4nvW7PtZNF5Nheoz8KkFASd3FFmA1gySj0JpuHp36aWBp6KepzwgPNeqI92LIzEjW94zk67hW4HCMBpOJt2zZN/60MBcqdvwKz6JiyWfXFJZphkkMdDRvkxtUrOVWFw== cardno:000609697937"
}
