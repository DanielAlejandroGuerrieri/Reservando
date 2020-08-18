var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    //Modifico el arreglo local con un nuevo array sin el horario que se reservo
    this.horarios = this.horarios.filter(function(horario) {
        return horario !== horarioReservado;
    });
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return this.promedio(this.calificaciones);
    }
}

Restaurant.prototype.promedio = function(arreglo) {
    return Math.round((this.sumatoria(arreglo) / arreglo.length) * 10) / 10;
}

Restaurant.prototype.sumatoria = function(arreglo) {
    let suma = 0;
    arreglo.forEach(element => {
        suma += element;
    });
    return suma;
}