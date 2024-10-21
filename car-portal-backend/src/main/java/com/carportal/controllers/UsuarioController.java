package com.carportal.controllers;

import com.carportal.dao.UsuarioRepository;
import com.carportal.models.Usuario;
import com.carportal.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/usuarios") // Mapeo a nivel de clase para simplificar las rutas
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JWTUtil jwtUtil;

    @GetMapping // Método GET para obtener todos los usuarios
    public List<Usuario> getUsuarios(@RequestHeader(value = "Authorization") String token) {
        if (!validarToken(token)) {
            return null;
        }
        return usuarioRepository.findAll(); // Usa el método findAll() proporcionado por JpaRepository
    }

    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @PostMapping // Método POST para registrar un nuevo usuario
    public void registrarUsuario(@RequestBody Usuario usuario) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hash);
        usuarioRepository.save(usuario); // Usa el método save() proporcionado por JpaRepository
    }

    @DeleteMapping("/{id}") // Método DELETE para eliminar un usuario por ID
    public void eliminar(@RequestHeader(value = "Authorization") String token, @PathVariable Long id) {
        if (!validarToken(token)) {
            return;
        }
        usuarioRepository.deleteById(id); // Usa el método deleteById() proporcionado por JpaRepository
    }
}
