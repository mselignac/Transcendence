import transformOverlay from 'unoverlay-vue'
import OverlayComponent from './components/test.vue'

// Convert to imperative overlay
export const callback = transformOverlay(OverlayComponent)
// Call the component and get the value of confirm
const value = await callback({ title: 'callbackOverlay' })
// value === "callbackOverlay:confirmed"