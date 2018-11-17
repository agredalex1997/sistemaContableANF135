new Vue({
    el: `#app`,
    template: `#app-template`,

    data: () => ({
        firstYear: {
            year: 2017,
            acciones: 0,

            ER: {
                ventasTotales: 0,
                rebajasVentas: 0,
                devolucionVentas: 0,
                comprasTotales: 0,
                devolucionCompras: 0,
                rebajasCompras: 0,
                inventarioInicial: 0,
                inventarioFinal: 0,

                //estos podrian convertirse en una propiedad computada
                gastosOperativos: 0,
                reservaLegal: 0,
                renta: 0,

                otrosIngresos: 0,
                otrosGastos: 0
            },

            balanceGral: {

            }
        },

        secondYear: {
            year: 2018,
            acciones: 0,

            ER: {
                ventasTotales: 0,
                rebajasVentas: 0,
                devolucionVentas: 0,
                comprasTotales: 0,
                devolucionCompras: 0,
                rebajasCompras: 0,
                inventarioInicial: 0,
                inventarioFinal: 0,

                //estos podrian convertirse en una propiedad computada
                gastosOperativos: 0,
                reservaLegal: 0,
                renta: 0,

                otrosIngresos: 0,
                otrosGastos: 0
            },

            balanceGral: {

            }
        }
    }),

    methods: {
        margenUtilidad(utilidad, ventas) {
            return utilidad / ventas;
        }
    },

    computed: {
        computedFirstYear() {
            let ER = this.firstYear.ER;
            let balanceGral = this.firstYear.balanceGral;

            let ventasNetas = ER.ventasTotales - ER.rebajasVentas - ER.devolucionVentas;
            let comprasNetas = ER.comprasTotales - ER.devolucionCompras - ER.rebajasCompras;
            let mercaderiaDisponible = comprasNetas + parseInt(ER.inventarioInicial);
            let costosVentas = mercaderiaDisponible - ER.inventarioFinal;
            let utilidadBruta = ventasNetas - costosVentas;
            let utilidadOperativa = utilidadBruta - ER.gastosOperativos;
            let UAR = utilidadOperativa - ER.otrosGastos + parseInt(ER.otrosIngresos);
            let UDR = UAR - ER.reservaLegal;
            let utilidadADistribuir = UDR - ER.renta;

            return {
                ER: {
                    ventasNetas,
                    comprasNetas,
                    mercaderiaDisponible,
                    costosVentas,
                    utilidadBruta,
                    utilidadOperativa,
                    UAR,
                    UDR,
                    utilidadADistribuir
                },
                balanceGral: {

                }
            }
        },

        computedSecondYear() {
            let ER = this.secondYear.ER;
            let balanceGral = this.secondYear.balanceGral;

            let ventasNetas = ER.ventasTotales - ER.rebajasVentas - ER.devolucionVentas;
            let comprasNetas = ER.comprasTotales - ER.devolucionCompras - ER.rebajasCompras;
            let mercaderiaDisponible = comprasNetas + parseInt(ER.inventarioInicial);
            let costosVentas = mercaderiaDisponible - ER.inventarioFinal;
            let utilidadBruta = ventasNetas - costosVentas;
            let utilidadOperativa = utilidadBruta - ER.gastosOperativos;
            let UAR = utilidadOperativa - ER.otrosGastos + parseInt(ER.otrosIngresos);
            let UDR = UAR - ER.reservaLegal;
            let utilidadADistribuir = UDR - ER.renta;

            return {
                ER: {
                    ventasNetas,
                    comprasNetas,
                    mercaderiaDisponible,
                    costosVentas,
                    utilidadBruta,
                    utilidadOperativa,
                    UAR,
                    UDR,
                    utilidadADistribuir
                }
            }
        }
    }
});