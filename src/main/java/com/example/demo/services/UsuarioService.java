package com.example.demo.services;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario salvarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarUsuario(int id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> atualizarUsuario(int id, Usuario usuarioAtualizado) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setName(usuarioAtualizado.getName());
            usuario.setBirthday(usuarioAtualizado.getBirthday());
            usuario.setPhone(usuarioAtualizado.getPhone());
            usuario.setEmail(usuarioAtualizado.getEmail());
            usuario.setUserName(usuarioAtualizado.getUserName());
            usuario.setPassword(usuarioAtualizado.getPassword());
            usuario.setAddress(usuarioAtualizado.getAddress());
            return usuarioRepository.save(usuario);
        });
    }

    public boolean deletarUsuario(int id) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuarioRepository.delete(usuario);
            return true;
        }).orElse(false);
    }
}
