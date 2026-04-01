import { registerPaymentMethod } from '@evershop/evershop/checkout/services';
import { getSetting } from '@evershop/evershop/setting/services';
export default async function bootstrap() {
    registerPaymentMethod({
        init: async () => ({
            code: 'bold_redirect',
            name: await getSetting('boldDisplayName', 'Bold')
        }),
        validator: async () => {
            const status = await getSetting('boldPaymentStatus', 0);
            return parseInt(String(status), 10) === 1;
        }
    });
}
//# sourceMappingURL=bootstrap.js.map