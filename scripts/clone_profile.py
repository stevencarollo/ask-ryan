"""Clone Steve's Chrome Default profile (minus caches) to C:\\nlm_prof_copy
so a CDP-enabled Chrome can run on the clone (Chrome forbids CDP on the
default data dir). Read-only against the source."""
import os
import shutil

SRC = os.path.join(os.environ["LOCALAPPDATA"], "Google", "Chrome", "User Data")
DST = r"C:\nlm_prof_copy"

SKIP_DIRS = {
    "Cache", "Code Cache", "Service Worker", "GPUCache", "GrShaderCache",
    "ShaderCache", "Crashpad", "component_crx_cache", "Safe Browsing",
    "OptimizationGuidePredictionModels", "BrowserMetrics", "Snapshots",
    "CertificateRevocation", "FileTypePolicies", "OptimizationHints",
    "PKIMetadata", "SafetyTips", "Subresource Filter", "WasmTtsEngine",
    "ZxcvbnData", "MEIPreload", "OnDeviceHeadSuggestModel", "segmentation_platform",
    "IndexedDB",
}

if os.path.exists(DST):
    shutil.rmtree(DST, ignore_errors=True)
os.makedirs(DST, exist_ok=True)

# Top-level: Local State + First Run are what matter besides the profile itself
for item in ("Local State", "First Run"):
    p = os.path.join(SRC, item)
    if os.path.isfile(p):
        shutil.copy2(p, os.path.join(DST, item))

def ignore(dirpath, names):
    return [n for n in names if n in SKIP_DIRS]

src_prof = os.path.join(SRC, "Default")
dst_prof = os.path.join(DST, "Default")
shutil.copytree(src_prof, dst_prof, ignore=ignore, dirs_exist_ok=True,
                copy_function=shutil.copy2)

total = 0
for root, dirs, files in os.walk(DST):
    for f in files:
        try:
            total += os.path.getsize(os.path.join(root, f))
        except OSError:
            pass
print(f"CLONED: {total/1e6:.0f} MB -> {DST}")
print("cookies db:", os.path.exists(os.path.join(dst_prof, "Network", "Cookies")))
