<script lang="ts">
    import StatusBanner from "$lib/components/StatusBanner.svelte";
	import type { PageData, ActionData } from './$types';
    import { onMount } from 'svelte';

    let origin = $state();

    onMount(() => {
        origin = window.location.origin;
        document.getElementById('file').addEventListener('change', function() {
            document.forms[0].submit(); // This submits the first form (you can change it if needed)
        });
    });

	let { data, form }: { data: PageData, form: ActionData } = $props();
 </script>
<div class="container">
    {#if form}
        <StatusBanner status={form.success ? "success" : "error"}>{form.success ? form.message : form.error}</StatusBanner>
    <br>
    {/if}
    <h1>nemo</h1><br>
    <form method="post" enctype="multipart/form-data">
        <input type="file" name="file" id="file" accept="image/*, video/*, audio/*"/>
        <br>
        <small>Supports images, videos, and audio</small>
        <br><br>
        <small>Please report uploaded CSAM to <a href="mailto:nemo@fyle.uk">nemo@fyle.uk</a></small>
    </form>
</div>