var expect = chai.expect;

describe('Test de función reservarHorario()', function() {
    it('Cuando se reserva un horario de un restaurant', function() {
        const testRestaurante = listado.restaurantes[0];
        testRestaurante.reservarHorario('13:00');

        expect(testRestaurante.horarios[0]).to.equal('15:30');
        expect(testRestaurante.horarios[1]).to.equal('18:00');
        expect(testRestaurante.horarios.length).to.equal(2);
    });

    it('Actua correctamente ante un horario no disponible en un restaurant', function() {
        const restaurantTest = listado.restaurantes[1];

        restaurantTest.reservarHorario('17:30');

        expect(restaurantTest.horarios[0]).to.equal('12:30');
        expect(restaurantTest.horarios[1]).to.equal('14:30');
        expect(restaurantTest.horarios[2]).to.equal('15:00');
        expect(restaurantTest.horarios.length).to.equal(3);
    });

    it('Cuando se reserva sin dar horario, el arreglo se mantenga igual', function() {
        const restaurantTest = listado.restaurantes[1];

        restaurantTest.reservarHorario();

        expect(restaurantTest.horarios[0]).to.equal('12:30');
        expect(restaurantTest.horarios[1]).to.equal('14:30');
        expect(restaurantTest.horarios[2]).to.equal('15:00');
        expect(restaurantTest.horarios.length).to.equal(3);
    });
});

describe('Test de función obtenerPuntuacion()', function() {
    it('Calculo correcto del promedio de calificaciones de un restaurant cuando tiene calificaciones', function() {
        const testRestaurante = listado.restaurantes[0];

        expect(testRestaurante.obtenerPuntuacion()).to.equal(7.4);

    });

    it('Calculo correcto del promedio de calificaciones cuando el restaurant no tiene calificaciones', function() {
        listado.restaurantes[4].calificaciones = [];
        expect(listado.restaurantes[4].obtenerPuntuacion()).to.equal(0);
    });
});
describe('Test de la función calificar() del objeto restaurant', function() {

    it('Valida correctamente cuando no se pasa parametro', function() {

        listado.restaurantes[2].calificar();
        expect(listado.restaurantes[2].calificaciones.length).to.equal(5);
    });

    it('Valida correctamente que la calificacion sea un numero entero', function() {

        listado.restaurantes[2].calificar('OK');
        expect(listado.restaurantes[2].calificaciones.length).to.equal(5);

        listado.restaurantes[2].calificar(0.9);
        expect(listado.restaurantes[2].calificaciones.length).to.equal(5);
    });

    it('Valida correctamente que la calificacion sea un numero entero mayor que cero y menor que 10', function() {
        listado.restaurantes[2].calificar(0);
        expect(listado.restaurantes[2].calificaciones.length).to.equal(5);

        listado.restaurantes[2].calificar(10);
        expect(listado.restaurantes[2].calificaciones.length).to.equal(5);

        listado.restaurantes[2].calificar(5);
        expect(listado.restaurantes[2].calificaciones.length).to.equal(6);
    });
});

describe('Test de función buscarRestaurant(id)', function() {
    it('Encuentra correctamente un restaurant mediante su id', function() {
        expect(listado.buscarRestaurante(7).id).to.equal(7);
    });

    it('Funciona correctamente si el id no existe', function() {
        expect(listado.buscarRestaurante(500)).to.equal('No se ha encontrado ningún restaurant');
    });
});

describe('Test de función obtenerRestaurantes()', function() {
    it('Funciona correctamente sin ningun filtros', function() {
        expect(listado.obtenerRestaurantes(null, null, null).length).to.equal(24);
    });

    it('Funciona correctamente filtrando solamente por ciudad', function() {
        expect(listado.obtenerRestaurantes(null, 'Nueva York', null).length).to.equal(7);
    });

    it('Funciona correctamente filtrando solamente por rubro', function() {
        expect(listado.obtenerRestaurantes('Hamburguesa', null, null).length).to.equal(4);
    });

    it('Funciona correctamente filtrando solamente por horario', function() {
        expect(listado.obtenerRestaurantes(null, null, '08:00').length).to.equal(0);
    });

    it('Funciona correctamente utilizando los filtros de ciudad, rubro y horario', function() {
        expect(listado.obtenerRestaurantes('Pasta', 'Berlín', '12:00').length).to.equal(1);
    });

});

describe('Test de función precioBase(), del objeto reserva', function() {

    it('Calcula correctamente el precio base', function() {
        expect(listadoDeReservas[0].precioBase()).to.equal(2800);
        expect(listadoDeReservas[1].precioBase()).to.equal(300);
    });
});
describe('Calculo correcto de la función precioFinal(), del objeto reserva', function() {
    it('Calcula correctamente el precio final', function() {
        expect(listadoDeReservas[0].precioFinal()).to.equal(2310);
        expect(listadoDeReservas[1].precioFinal()).to.equal(100);
    });
});