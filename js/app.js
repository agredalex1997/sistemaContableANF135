new Vue({
  el: `#app`,
  template: `#app-template`,

  data: () => ({
    firstYear: {
      year: 2017,
      acciones: 0,

      ER: {
        ingresos: 229234,
        consumosGastosExternos: 141048,

        gastosPersonal: 15261,
        investigacionDev: 11581,

        ingresosFinancieros: 2878,
        otrosGastos: 133,

        impuestoBeneficios: 15738
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

        accionesComunes: 35867,
        resultadoEjercicioAnterior: 98330,
        gananciaNoRealizada: -124,
        otrasParticipaciones: 26
      }
    },

    secondYear: {
      year: 2018,
      acciones: 0,

      ER: {},

      balanceGral: {
        efectivo: 11575,
        efectivoYEquivalentes: 14338,
        inversionesCortoPlazo: 40388,
        cuentasPorCobrar: 48995,
        inventarios: 3956,
        otrosActivosCorrientes: 12087,

        inmueblesMobiliarioYEquipo: 90403,
        depreciacionAcumuladaInmueblesMobiliarioYEquipo: 49099,
        inversionesPermanentes: 170799,
        otrosActivosPermanentes: 22283,

        cuentasPorPagar: 55888,
        documentosPorPagar: 11964,
        deudasEntidadesCredito: 8784,
        otrasCuentasPorPagar: 40230,

        deudaLargoPlazo: 93735,
        impuestoDiferidoGanancias: 426,
        otrosPasivos: 47551,

        accionesComunes: 40201,
        resultadoEjercicioAnterior: 70400,
        gananciaNoRealizada: 810,
        otrasParticipaciones: 4264
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
      //calculos de estado de resultados
      let ER = this.firstYear.ER;

      let beneficioBruto = ER.ingresos - ER.consumosGastosExternos;
      let gastosExplotacion =
        parseInt(ER.gastosPersonal) +
        parseInt(ER.investigacionDev) +
        parseInt(ER.consumosGastosExternos);
      let resultadoExplotacion = ER.ingresos - gastosExplotacion;
      let resultadoOrdinarioAntesImpuestos =
        parseInt(resultadoExplotacion) +
        parseInt(ER.ingresosFinancieros) -
        ER.otrosGastos;
      let resultadoEjercicioOperacionesContinuadas =
        resultadoOrdinarioAntesImpuestos - ER.impuestoBeneficios;

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

      let totalPasivos =
        parseInt(balanceGral.deudaLargoPlazo) +
        parseInt(balanceGral.impuestoDiferidoGanancias) +
        parseInt(balanceGral.otrosPasivos) +
        totalPasivosCorrientes;
      let capitalContable =
        parseInt(balanceGral.accionesComunes) +
        parseInt(balanceGral.resultadoEjercicioAnterior) +
        parseInt(balanceGral.gananciaNoRealizada) -
        balanceGral.otrasParticipaciones;
      let totalPasivoCapitalContable =
        parseInt(totalPasivos) + parseInt(capitalContable);

      return {
        ER: {
          beneficioBruto,
          gastosExplotacion,
          resultadoExplotacion,
          resultadoOrdinarioAntesImpuestos,
          resultadoEjercicioOperacionesContinuadas
        },

        balanceGral: {
          efectivoEInversionesCortoPlazo,
          totalActivosCorrientes,
          inmueblesMobiliarioYEquipoNeto,
          totalActivos,
          totalPasivosCorrientes,
          totalPasivos,
          capitalContable,
          totalPasivoCapitalContable
        }
      };
    },

    computedSecondYear() {
      //calculos de estado de resultados
      let ER = this.secondYear.ER;

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
      let balanceGral = this.secondYear.balanceGral;

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

      let totalPasivos =
        parseInt(balanceGral.deudaLargoPlazo) +
        parseInt(balanceGral.impuestoDiferidoGanancias) +
        parseInt(balanceGral.otrosPasivos) +
        totalPasivosCorrientes;
      let capitalContable =
        parseInt(balanceGral.accionesComunes) +
        parseInt(balanceGral.resultadoEjercicioAnterior) +
        parseInt(balanceGral.gananciaNoRealizada) -
        balanceGral.otrasParticipaciones;
      let totalPasivoCapitalContable =
        parseInt(totalPasivos) + parseInt(capitalContable);

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
          totalPasivos,
          capitalContable,
          totalPasivoCapitalContable
        }
      };
    }
  }
});
