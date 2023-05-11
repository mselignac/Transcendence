<script lang="ts">

import Cookies from 'js-cookie';
import { accountService } from '@/_services'

export default {
	async mounted() {
		const { VITE_APP_BACKEND_PORT: port, VITE_APP_HOST: host } = await import.meta.env;
		window.location.href = `http://${host}:${port}/auth/42/login`;
		accountService.saveToken(Cookies.get('jwt'));
	}
}
</script>