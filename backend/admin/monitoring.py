"""Monitoring and alerting system."""
from typing import Dict, List
import logging
from datetime import datetime, timedelta

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class SystemMonitor:
    """Monitor system health and performance."""

    def __init__(self):
        self.metrics = {
            "api_status": "healthy",
            "db_status": "connected",
            "cache_hit_rate": 34,
            "avg_latency_ms": 245,
            "error_rate": 0,
            "uptime_hours": 48
        }

        self.thresholds = {
            "max_latency": 1000,
            "min_cache_hit": 20,
            "max_error_rate": 5,
            "db_timeout": 30
        }

        self.alerts = []

    def check_health(self) -> Dict:
        """Run full health check."""
        health = {
            "timestamp": datetime.now().isoformat(),
            "status": "healthy",
            "issues": []
        }

        # Check latency
        if self.metrics["avg_latency_ms"] > self.thresholds["max_latency"]:
            health["issues"].append("⚠️ High latency detected")
            health["status"] = "degraded"

        # Check cache
        if self.metrics["cache_hit_rate"] < self.thresholds["min_cache_hit"]:
            health["issues"].append("⚠️ Low cache hit rate")
            health["status"] = "degraded"

        # Check errors
        if self.metrics["error_rate"] > self.thresholds["max_error_rate"]:
            health["issues"].append("❌ High error rate")
            health["status"] = "unhealthy"

        return health

    def log_query(self, query: str, latency_ms: int, success: bool) -> None:
        """Log query for analytics."""
        logger.info(
            f"Query: '{query[:50]}...' | Latency: {latency_ms}ms | "
            f"Status: {'✓' if success else '✗'}"
        )

        # Update rolling metrics
        self.metrics["avg_latency_ms"] = (
            (self.metrics["avg_latency_ms"] * 0.9) + (latency_ms * 0.1)
        )

    def get_performance_report(self) -> Dict:
        """Get performance metrics."""
        return {
            "avg_latency_ms": round(self.metrics["avg_latency_ms"], 1),
            "cache_hit_rate": self.metrics["cache_hit_rate"],
            "error_rate": self.metrics["error_rate"],
            "uptime_hours": self.metrics["uptime_hours"]
        }

    def get_alerts(self) -> List[str]:
        """Get current alerts."""
        alerts = []

        health = self.check_health()
        if health["issues"]:
            alerts.extend(health["issues"])

        return alerts


class AlertManager:
    """Manage system alerts and notifications."""

    def __init__(self, email: str = "admin@example.com"):
        self.email = email
        self.alert_log = []
        self.enabled_channels = ["console", "log"]  # Could add 'email', 'slack'

    def send_alert(self, level: str, message: str, context: Dict = None) -> None:
        """Send alert via configured channels."""
        alert = {
            "timestamp": datetime.now().isoformat(),
            "level": level,
            "message": message,
            "context": context or {}
        }

        self.alert_log.append(alert)

        if "console" in self.enabled_channels:
            icon = "❌" if level == "error" else "⚠️" if level == "warning" else "ℹ️"
            print(f"{icon} [{level.upper()}] {message}")

        if "log" in self.enabled_channels:
            logger.log(
                getattr(logging, level.upper()),
                f"{message} | Context: {context}"
            )

    def get_recent_alerts(self, hours: int = 24) -> List[Dict]:
        """Get alerts from last N hours."""
        cutoff = datetime.now() - timedelta(hours=hours)

        return [
            a for a in self.alert_log
            if datetime.fromisoformat(a["timestamp"]) > cutoff
        ]


class MetricsCollector:
    """Collect and aggregate system metrics."""

    def __init__(self):
        self.metrics = {}
        self.collection_interval = 60  # seconds

    def record_metric(self, name: str, value: float, tags: Dict = None) -> None:
        """Record a metric."""
        key = f"{name}{'_' + '_'.join(f'{k}_{v}' for k, v in tags.items()) if tags else ''}"

        if key not in self.metrics:
            self.metrics[key] = []

        self.metrics[key].append({
            "timestamp": datetime.now().isoformat(),
            "value": value
        })

    def get_aggregate(self, metric_name: str, minutes: int = 5) -> Dict:
        """Get aggregated metric."""
        recent = self.metrics.get(metric_name, [])
        cutoff = datetime.now() - timedelta(minutes=minutes)

        recent_vals = [
            m["value"] for m in recent
            if datetime.fromisoformat(m["timestamp"]) > cutoff
        ]

        if not recent_vals:
            return {}

        return {
            "count": len(recent_vals),
            "avg": sum(recent_vals) / len(recent_vals),
            "min": min(recent_vals),
            "max": max(recent_vals)
        }


if __name__ == "__main__":
    print("\n" + "="*60)
    print("MONITORING & ALERTS")
    print("="*60)

    # Demo
    monitor = SystemMonitor()
    alerts = AlertManager()

    # Log some queries
    monitor.log_query("how to close a deal", 245, True)
    monitor.log_query("objection handling", 312, True)

    # Check health
    health = monitor.check_health()
    print(f"\nSystem Health: {health['status'].upper()}")
    if health['issues']:
        for issue in health['issues']:
            print(f"  {issue}")

    # Send sample alert
    alerts.send_alert("warning", "High latency detected", {"avg_ms": 450})

    # Get performance
    perf = monitor.get_performance_report()
    print(f"\nPerformance Metrics:")
    for key, value in perf.items():
        print(f"  {key}: {value}")
