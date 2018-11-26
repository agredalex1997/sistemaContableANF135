new Vue({
  el: `#app`,
  template: `#app-template`,

  data: () => ({
    firstYear: {
      year: 2017,

      ER: {
        ingresos: 229234,
        consumosGastosExternos: 141048,

        gastosPersonal: 15261,
        investigacionDev: 11581,

        ingresosFinancieros: 2878,
        otrosGastos: 133,

        impuestoBeneficios: 15738,

        resultadoOperacionesInterrumpidas: 0,

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

      ER: {
        ingresos: 265595,
        consumosGastosExternos: 163756,

        gastosPersonal: 16705,
        investigacionDev: 14236,

        ingresosFinancieros: 2446,
        otrosGastos: 441,

        impuestoBeneficios: 11857,

        resultadoOperacionesInterrumpidas: 1515,

      },

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
    },
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
      let resultadoOperacionesContinuadas =
        resultadoOrdinarioAntesImpuestos - ER.impuestoBeneficios;
      let resultadoAtribuidoGrupo = resultadoOperacionesContinuadas - ER.resultadoOperacionesInterrumpidas;

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
          resultadoOperacionesContinuadas,
          resultadoAtribuidoGrupo,
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
      let resultadoOperacionesContinuadas =
        resultadoOrdinarioAntesImpuestos - ER.impuestoBeneficios;
      let resultadoAtribuidoGrupo = resultadoOperacionesContinuadas - ER.resultadoOperacionesInterrumpidas;

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
          beneficioBruto,
          gastosExplotacion,
          resultadoExplotacion,
          resultadoOrdinarioAntesImpuestos,
          resultadoOperacionesContinuadas,
          resultadoAtribuidoGrupo,
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
  }
});