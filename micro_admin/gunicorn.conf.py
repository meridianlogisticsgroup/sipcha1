import multiprocessing

bind = "0.0.0.0:8000"
workers = max(2, multiprocessing.cpu_count() * 2 + 1)
threads = 8
worker_class = "gthread"
timeout = 60
graceful_timeout = 30
keepalive = 5
max_requests = 5000
max_requests_jitter = 500
errorlog = "-"
accesslog = "-"
