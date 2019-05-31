new Vue({
    el: '#vue-header',
    template: '<div>' +
    '<input type=\"button\" v-on:click=\"clickTab\" v-for=\"pn in pluginNames\" v-bind:value=\"pn\" >' +
    '</div>',
    data: {
        pluginNames: ['none']
    },

    // on created load plugin names
    created: function () {
        var vm = this;
        vm.$httpGet({
            url: '/plugin',
            onDone: function (res) {
                vm.$data.pluginNames = res.pluginNames;
            }
        })
    },

    methods: {

        // when a plugin tab is clicked
        clickTab: function (e) {

            console.log(e.target.value);

        }

    }

});
