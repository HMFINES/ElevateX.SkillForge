#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RUNTIME_DIR="$ROOT_DIR/.local-runtime"
DATA_DIR="$RUNTIME_DIR/data/db"
LOG_DIR="$RUNTIME_DIR/logs"
RUN_DIR="$RUNTIME_DIR/run"
PID_FILE="$RUN_DIR/mongod.pid"
MONGO_DIR="$(find "$RUNTIME_DIR" -maxdepth 1 -type d -name 'mongodb-*' | sort | tail -n 1)"

if [[ -z "${MONGO_DIR:-}" || ! -x "$MONGO_DIR/bin/mongod" ]]; then
  echo "MongoDB is not installed yet. Run: npm run db:install"
  exit 1
fi

mkdir -p "$DATA_DIR" "$LOG_DIR" "$RUN_DIR"

is_running() {
  local pid="${1:-}"
  [[ -n "$pid" ]] && ps -p "$pid" >/dev/null 2>&1
}

start_mongo() {
  if [[ -f "$PID_FILE" ]] && is_running "$(cat "$PID_FILE")"; then
    echo "MongoDB is already running with PID $(cat "$PID_FILE")"
    exit 0
  fi

  "$MONGO_DIR/bin/mongod" \
    --dbpath "$DATA_DIR" \
    --logpath "$LOG_DIR/mongod.log" \
    --bind_ip 127.0.0.1 \
    --port 27017 \
    --fork \
    --pidfilepath "$PID_FILE"

  echo "MongoDB started on mongodb://127.0.0.1:27017"
}

stop_mongo() {
  if [[ ! -f "$PID_FILE" ]] || ! is_running "$(cat "$PID_FILE")"; then
    echo "MongoDB is not running"
    rm -f "$PID_FILE"
    exit 0
  fi

  kill "$(cat "$PID_FILE")"

  for _ in {1..20}; do
    if ! is_running "$(cat "$PID_FILE")"; then
      rm -f "$PID_FILE"
      echo "MongoDB stopped"
      exit 0
    fi
    sleep 1
  done

  echo "MongoDB did not stop gracefully"
  exit 1
}

status_mongo() {
  if [[ -f "$PID_FILE" ]] && is_running "$(cat "$PID_FILE")"; then
    echo "MongoDB is running with PID $(cat "$PID_FILE")"
    exit 0
  fi

  echo "MongoDB is not running"
  exit 1
}

case "${1:-start}" in
  start)
    start_mongo
    ;;
  stop)
    stop_mongo
    ;;
  status)
    status_mongo
    ;;
  *)
    echo "Usage: $0 [start|stop|status]"
    exit 1
    ;;
esac
