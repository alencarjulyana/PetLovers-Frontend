package com.example.demo.dto;

import com.example.demo.model.Usuario;

public class UsuarioDTO {
    private int id;
    private String name;
    private String email;
    private String phone;
    private String address;

    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.name = usuario.getName();
        this.email = usuario.getEmail();
        this.phone = usuario.getPhone();
        this.address = usuario.getAddress();
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }
}
