<script>
export default {
	mounted() {
		const port = import.meta.env.VITE_APP_BACKEND_PORT;
		const host = import.meta.env.VITE_APP_HOST;
		window.location.href = `http://${host}:${port}/auth/42/login`;
	}
}
</script>