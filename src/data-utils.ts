export default class DataUtils {
    static getScript(source: string): void {
        const script = document.createElement('script');
        const prior = document.getElementsByTagName('script')[0];
        script.async = true;

        script.src = source;
        prior.parentNode.insertBefore(script, prior);
    }
}
