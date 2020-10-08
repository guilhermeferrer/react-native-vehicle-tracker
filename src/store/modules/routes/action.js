import { format } from 'date-fns';

export function getRoutes({ imei, startDate = format(new Date(), 'yyyy-MM-dd'), endDate = format(new Date(), 'yyyy-MM-dd') }) {
    return {
        type: 'GET_ROUTES',
        request: [{
            url: `/report/routes?imei=${imei}&startDate=${'2020-10-07'}&endDate=${'2020-10-07'}`, method: 'get'
        }]
    }
}