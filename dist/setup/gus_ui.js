const template = document.createElement('template')

template.innerHTML = `
<style>
* {
    margin: 0;
    padding: 0;
}
.gus-ui {
    width: 100vw;
    height: 100vh;
    background-color: #121212;
    display: grid;
    justify-items: center;
    align-items: center;
    overflow: hidden;
}
</style>
<div class="gus-ui">
    <slot>
    </slot>
</div>
`

export class GusUi extends HTMLElement {
    static get observedAttributes() {
        return ['color-dark', 'color-light','mode'];
    }

    constructor() {
        super()
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        if (!this.colorDark) {
            this.colorDark = "#BB86FC"
        }
        if (!this.colorLight) {
            this.colorLight = "#6200EE"
        }
        if (!this.mode) {
            this.mode = "dark"
        }

        this.style.position = "relative"
        this.style.transition = "0.2s"

        this.render()
    }

    // To do when a attribute changed
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'color-dark':
                    this.colorDark = newVal
                    break;
                case 'color-light':
                    this.colorLight = newVal
                    break;
                case 'mode':
                    this.mode = newVal
                    break;
            }
        }
    }

    // Define methods for gus-ui 'color-dark' attribute (String)
    get colorDark() {
        return this.getAttribute('color-dark')
    }

    set colorDark(value) {
        this.setAttribute('color-dark', value)
    }

    // Define methods for gus-ui 'color-light' attribute (String)
    get colorLight() {
        return this.getAttribute('color-light')
    }

    set colorLight(value) {
        this.setAttribute('color-light', value)
    }

    // Define methods for gus-ui 'mode' attribute (String)
    get mode() {
        return this.getAttribute('mode')
    }

    set mode(value) {
        this.setAttribute('mode', value)
    }

    // Re-render the whole gus-ui
    render() {
        var style = document.documentElement.style

        if (this.mode === "dark") { // Dark Mode

            style.setProperty('--gus-ui-color-primary', `${this.colorDark}`)
            style.setProperty('--gus-ui-color-primary-hover', `${this.pSBC(0.24, this.colorDark)}`)

            style.setProperty('--gus-ui-color-background', '#121212')
            style.setProperty('--gus-ui-color-background-hover', '#161616')

            style.setProperty('--gus-ui-color-surface', '#181818')
            style.setProperty('--gus-ui-color-surface-hover', '#202020')
            style.setProperty('--gus-ui-color-surface-focus', '#242424')
            style.setProperty('--gus-ui-color-surface-disabled', '#181818')

            style.setProperty('--gus-ui-color-error', '#CF6679')

            style.setProperty('--gus-ui-color-on-primary', '#000000')

            style.setProperty('--gus-ui-color-on-secondary', '#000000')
            style.setProperty('--gus-ui-color-on-background', '#FFFFFF')
            style.setProperty('--gus-ui-color-on-surface', '#FFFFFF')
            style.setProperty('--gus-ui-color-on-surface-secondary', '#959595')
            style.setProperty('--gus-ui-color-on-surface-disabled', '#A5A5A5')

            style.setProperty('--gus-ui-color-on-error', '#000000')

            style.setProperty('--gus-ui-color-component-shadow', '0px 0px 0px grey')
            style.setProperty('--gus-ui-color-surface-shadow', '0px 0px 0px grey')

            style.setProperty('--gus-ui-color-white', '#FFFFFF')
            
        } else { // Light Mode

            style.setProperty('--gus-ui-color-primary', `${this.colorLight}`)
            style.setProperty('--gus-ui-color-primary-hover', `${this.pSBC(0.10, this.colorLight)}`)

            style.setProperty('--gus-ui-color-background', '#FFFFFF')
            style.setProperty('--gus-ui-color-background-hover', '#F5F5F5')

            style.setProperty('--gus-ui-color-surface', '#FFFFFF')
            style.setProperty('--gus-ui-color-surface-hover', '#F0F0F0')
            style.setProperty('--gus-ui-color-surface-focus', '#E4E4E4')
            style.setProperty('--gus-ui-color-surface-disabled', '#A5A5A5')

            style.setProperty('--gus-ui-color-error', '#B00020')

            style.setProperty('--gus-ui-color-on-primary', '#FFFFFF')

            style.setProperty('--gus-ui-color-on-secondary', '#000000')
            style.setProperty('--gus-ui-color-on-background', '#000000')
            style.setProperty('--gus-ui-color-on-surface', '#000000')
            style.setProperty('--gus-ui-color-on-surface-secondary', '#959595')
            style.setProperty('--gus-ui-color-on-surface-disabled', '#A5A5A5')

            style.setProperty('--gus-ui-color-on-error', '#FFFFFF')

            style.setProperty('--gus-ui-color-component-shadow', '0px 1px 2px grey')
            style.setProperty('--gus-ui-color-surface-shadow', '0px 2px 4px grey')

            style.setProperty('--gus-ui-color-white', '#FFFFFF')
        }
    }

    // Get a hex color and returns it lighter or darker by the amount passed
    LightenDarkenColor(col, amt) {
        col = parseInt(col, 16);
        return (((col & 0x0000FF) + amt) | ((((col >> 8) & 0x00FF) + amt) << 8) | (((col >> 16) + amt) << 16)).toString(16);
    }

    pSBC (p,c0,c1,l) {
        let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
        if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
        if(!this.pSBCr)this.pSBCr=(d)=>{
            let n=d.length,x={};
            if(n>9){
                [r,g,b,a]=d=d.split(","),n=d.length;
                if(n<3||n>4)return null;
                x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
            }else{
                if(n==8||n==6||n<4)return null;
                if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
                d=i(d.slice(1),16);
                if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
                else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
            }return x};
        h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
        if(!f||!t)return null;
        if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
        else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
        a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
        if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
        else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
    }
}

window.customElements.define('gus-ui', GusUi)