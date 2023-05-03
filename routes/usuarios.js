const { Router } = require('express');

const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido,
    existeEmail,
    existeUsuarioPorID } = require('../helpers/db-validatorsMongo')

const router = Router();

/* router.get('/', (req, res) => {
    res.send('Pagina Inicio');
}); */

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('password', 'El password es Obligatorio y debe ser mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    //check('rol', 'No es un Rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRoleValido), validarCampos
], usuariosPut);

router.patch('/:id', usuariosPatch);

router.delete('/:id', [
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos], usuariosDelete);



module.exports = router;