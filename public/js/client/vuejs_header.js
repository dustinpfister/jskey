new Vue({
    el: '#vue-header',
    template: '<p><span v-for=\"pn in pluginNames\">{{ pn }}</span></p>',
    data: {
        pluginNames: ['none']
    },
    created: function () {

        var vm = this;

        vm.$httpGet({
            url: '/plugin',
            onDone: function (res) {

                vm.$data.pluginNames = res.pluginNames;

            }
        })

    }

});
