const Reserva = function(horario, cantidadPersonas, precioPersona, codigoDescuento) {
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento;
}


Reserva.prototype.precioBase = function() {
    //calculo de valor base de la reserva
    return this.cantidadPersonas * this.precioPersona;
}

Reserva.prototype.precioFinal = function() {
    //calculo de precio final, sumados los adicionales y restando los descuentos
    const precioBase = this.precioBase();
    const adicional = this.adicionales(precioBase);
    const descuento = this.descuentos(precioBase);
    return precioBase + adicional - descuento;
}

Reserva.prototype.adicionales = function(baseCalculo) {
    return this.adicionalFinDeSemana(baseCalculo) + this.adicionalHorario(baseCalculo);
}

Reserva.prototype.adicionalFinDeSemana = function(calculoBase) {
    const diaSemana = this.horario.getUTCDay();

    if (diaSemana === 0 || diaSemana === 5 || diaSemana === 6) {
        return calculoBase * 10 / 100;
    };

    return 0;
}

Reserva.prototype.adicionalHorario = function(calculoBase) {
    const minutos = (this.horario.getHours() * 60) + this.horario.getMinutes();

    if ((minutos >= 780 && minutos < 840) || (minutos >= 1200 && minutos < 1260)) {
        return calculoBase *
            5 / 100;
    };

    return 0;
}

Reserva.prototype.descuentos = function(baseCalculo) {
    return this.descuentosGrupo(baseCalculo) + this.descuentosCodigo(baseCalculo);
}

Reserva.prototype.descuentosGrupo = function(calculoBase) {
    let descuento = 0;
    let cantidadPersonas = this.cantidadPersonas;
    if (cantidadPersonas >= 4 && cantidadPersonas < 6) {
        descuento = 5;
    } else if (cantidadPersonas >= 6 && cantidadPersonas < 8) {
        descuento = 10;
    } else if (cantidadPersonas >= 8) {
        descuento = 15;
    }

    return calculoBase * descuento / 100;
}

Reserva.prototype.descuentosCodigo = function(calculoBase) {
    let descuento = 0;
    let codigo = this.codigoDescuento;
    if (codigo === 'DES15') {
        descuento = calculoBase *
            15 / 100;
    } else if (codigo === 'DES200') {
        descuento = 200;
    } else if (codigo === 'DES1') {
        descuento = this.precioPersona;
    }

    return descuento;
}

//Listados de objetos Reserva para calculo de ejemplo
const listadoDeReservas = [
    new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1"),
    new Reserva(new Date(2018, 7, 27, 14, 00), 2, 150, "DES200"),
];