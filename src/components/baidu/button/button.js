let app = getApp();
console.log('is button');
Component({
    properties: {
        theme: {
            type: String,
            value: '',
        },
        ifdocs: {
            type: String,
            value: '',
        },
    },
    observers: {
        ifdocs: function(ifdocs) {
            console.log('app');
        },
        theme: function(theme) {
            swan.setNavigationBarColor({
                frontColor: theme === 'dark' ? '#ffffff' : '#000000',
                backgroundColor: '#3670C2',
                animation: {
                    duration: 500,
                    timingFunc: 'linear',
                },
            });
        },
    },
    data: {
        age: 1,
        statusBarHeight: 20,
    },
    methods: {
        created() {
            console.log('is create');
            // console.log(app.globalData.openParams);
        },
        back() {
            swan.navigateBack({
                success: res => {
                    console.log('navigateBack success');
                },
                fail: err => {
                    console.log('navigateBack fail', err);
                },
            });
        },
        click() {
            console.log('this is click');
        },
        contactCB(e) {
            console.log('contact', e);
        },
    },
});
