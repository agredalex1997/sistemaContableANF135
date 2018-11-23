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
        efectivo: 7982,
        efectivoYEquivalentes: 12307,
        inversionesCortoPlazo: 53892,
        cuentasPorCobrar: 35673,
        inventarios: 4855,
        otrosActivosCorrientes: 13936,

        inmueblesMobiliarioYEquipo: 75076,
        depreciacionAcumuladaInmueblesMobiliarioYEquipo: 41293,
        inversionesPermanentes: 194714,
        otrosActivosPermanentes: 18177,

        cuentasPorPagar: 44242,
        documentosPorPagar: 11977,
        deudasEntidadesCredito: 6496,
        otrasCuentasPorPagar: 38099,

        deudaLargoPlazo: 97207,
        impuestoDiferidoGanancias: 31504,
        otrosPasivos: 11747,

        accionesComunes: 38624,
        resultadoEjerciciosAnteriores: 79436,
        gananciaNoRealizada: 948,
        otrasParticipaciones: 4059
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

      balanceGral: {}
    }
  }),

  methods: {
    margenUtilidad(utilidad, ventas) {
      return utilidad / ventas;
    }
  },

  computed: {
    computedFirstYear() {
      //calculos de estado de resultados
      let ER = this.firstYear.ER;

      let ventasNetas =
        ER.ventasTotales - ER.rebajasVentas - ER.devolucionVentas;
      let comprasNetas =
        ER.comprasTotales - ER.devolucionCompras - ER.rebajasCompras;
      let mercaderiaDisponible = comprasNetas + parseInt(ER.inventarioInicial);
      let costosVentas = mercaderiaDisponible - ER.inventarioFinal;
      let utilidadBruta = ventasNetas - costosVentas;
      let utilidadOperativa = utilidadBruta - ER.gastosOperativos;
      let UAR = utilidadOperativa - ER.otrosGastos + parseInt(ER.otrosIngresos);
      let UDR = UAR - ER.reservaLegal;
      let utilidadADistribuir = UDR - ER.renta;

      //calculos de balance general
      let balanceGral = this.firstYear.balanceGral;

      let efectivoEInversionesCortoPlazo =
        parseInt(balanceGral.efectivo) +
        parseInt(balanceGral.efectivoYEquivalentes) +
        parseInt(balanceGral.inversionesCortoPlazo);
      let totalActivosCorrientes =
        parseInt(balanceGral.cuentasPorCobrar) +
        parseInt(balanceGral.inventarios) +
        parseInt(balanceGral.otrosActivosCorrientes) +
        parseInt(efectivoEInversionesCortoPlazo);
      let inmueblesMobiliarioYEquipoNeto =
        balanceGral.inmueblesMobiliarioYEquipo -
        balanceGral.depreciacionAcumuladaInmueblesMobiliarioYEquipo;
      let totalActivos =
        parseInt(totalActivosCorrientes) +
        parseInt(inmueblesMobiliarioYEquipoNeto) +
        parseInt(balanceGral.inversionesPermanentes) +
        parseInt(balanceGral.otrosActivosPermanentes);

      let totalPasivosCorrientes =
        parseInt(balanceGral.cuentasPorPagar) +
        parseInt(balanceGral.documentosPorPagar) +
        parseInt(balanceGral.deudasEntidadesCredito) +
        parseInt(balanceGral.otrasCuentasPorPagar);

      let totalPasivos = parseInt(balanceGral.deudaLargoPlazo) + parseInt(balanceGral.impuestoDiferidoGanancias) + parseInt(balanceGral.otrosPasivos) + totalPasivosCorrientes;
      let capitalContable = parseInt(balanceGral.accionesComunes) + parseInt(balanceGral.resultadoEjerciciosAnteriores) + parseInt(balanceGral.gananciaNoRealizada) + parseInt(balanceGral.otrasParticipaciones)

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
          efectivoEInversionesCortoPlazo,
          totalActivosCorrientes,
          inmueblesMobiliarioYEquipoNeto,
          totalActivos,
          totalPasivosCorrientes,
          totalPasivos
        }
      };
    },

    computedSecondYear() {
      let ER = this.secondYear.ER;
      let balanceGral = this.secondYear.balanceGral;

      let ventasNetas =
        ER.ventasTotales - ER.rebajasVentas - ER.devolucionVentas;
      let comprasNetas =
        ER.comprasTotales - ER.devolucionCompras - ER.rebajasCompras;
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

        balanceGral: {}
      };
    }
  }
});