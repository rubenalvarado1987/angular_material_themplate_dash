import { VERSION } from './version';

export const environment = {
  production: true,
  host_es :"internal-lb-sales-rf-beta-2096155701.us-east-1.elb.amazonaws.com:9200",
  version: VERSION.tag,
  googleAnalytics: {
    domain: 'auto',
    trackingId: 'UA-132433390-1' // replace with your Tracking Id
  }
};
