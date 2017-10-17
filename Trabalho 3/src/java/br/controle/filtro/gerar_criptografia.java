package br.controle.filtro;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
 import java.security.MessageDigest;
 import java.security.NoSuchAlgorithmException;

@WebFilter(filterName = "Verifica_logado", servletNames = {"ServLet1"}, urlPatterns={"/sucesso.jsp"})
public class gerar_criptografia implements Filter {
    
    public static final String passw = "A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3"; //123 hasheado em hexadecimal
    
    //gera hex da senha
     public String faz_hash (String senha) throws NoSuchAlgorithmException, UnsupportedEncodingException {
         MessageDigest algorithm = MessageDigest.getInstance("SHA-256");
     
        byte messageDigest[] = algorithm.digest(senha.getBytes("UTF-8"));

        StringBuilder hexString = new StringBuilder();
        for (byte b : messageDigest) {
            hexString.append(String.format("%02X", 0xFF & b));
        }
        
        return hexString.toString();
    }
     
    public Boolean comparador(String input) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        String entrada = faz_hash(input);
        if (entrada == passw) 
            return true;
        return false;
    }

    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain)
            throws IOException, ServletException {

        HttpSession sessao = ((HttpServletRequest) request).getSession(true);
        Object logado = sessao.getAttribute("logado");
        if (logado != null) {
            String aux = (String) logado;
            if (aux.equals("ok")) {
                chain.doFilter(request, response);
            } else {
                RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
                rd.forward(request, response);
            }
        } else {

            RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
            rd.forward(request, response);

        }
    }

    @Override
    public void destroy() {  }

    @Override
    public void init(FilterConfig filterConfig) {   

    }

}
