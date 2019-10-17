export default class DataUtils {
    static getScript(source: string, callback?: Function): void {
        let script = document.createElement('script') as any;
        const prior = document.getElementsByTagName('script')[0];
        script.async = true;

        script.onload = script.onreadystatechange = function( _, isAbort ) {
            if(isAbort || !(script as XMLHttpRequest).readyState || /loaded|complete/.test(script.readyState) ) {
                script.onload = script.onreadystatechange = null;
                script = undefined;

                if(!isAbort && callback) setTimeout(callback, 0);
            }
        };

        script.src = source;
        prior.parentNode.insertBefore(script, prior);
    }
}
