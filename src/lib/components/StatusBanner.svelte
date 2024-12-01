<script lang="ts">
    import type { Snippet } from "svelte";

    const { status, children }: { status: "success" | "warn" | "error", children: Snippet } = $props()
</script>
<style>
    div {
        border-top: 2px solid var(--color);
        background-color: color-mix(in srgb, var(--color) 20%, var(--background) 80%);
        text-align: center;
        padding: 10px;
    }

    .error {
        --color: #ff2449;
    }

    .warn {
        --color: #ecff3f;
    }

    .success {
        --color: #22ff5d;
    }
</style>
<div class={status}>
    {@render children()}
</div>