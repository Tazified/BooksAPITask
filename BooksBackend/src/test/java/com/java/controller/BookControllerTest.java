package com.java.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.java.model.Book;
import com.java.service.BookService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BookController.class)
public class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetAllBooks() throws Exception {
        List<Book> books = Arrays.asList(
            new Book("9780000000001", "The Odyssey", "Homer", 1996)
        );
        given(bookService.getAllBooks()).willReturn(books);

        mockMvc.perform(get("/api/books"))
               .andExpect(status().isOk())
               .andExpect(content().json(objectMapper.writeValueAsString(books)));
    }

    @Test
    public void testGetBookByIsbnFound() throws Exception {
        Book book = new Book("9780000000001", "The Odyssey", "Homer", 1996);
        given(bookService.getBookByIsbn("9780000000001")).willReturn(Optional.of(book));

        mockMvc.perform(get("/api/books/{isbn}", "9780000000001"))
               .andExpect(status().isOk())
               .andExpect(content().json(objectMapper.writeValueAsString(book)));
    }

    @Test
    public void testGetBookByIsbnNotFound() throws Exception {
        given(bookService.getBookByIsbn("99999")).willReturn(Optional.empty());

        mockMvc.perform(get("/api/books/{isbn}", "99999"))
               .andExpect(status().isNotFound());
    }

    @Test
    public void testAddBook() throws Exception {
        Book book = new Book("9780000000010", "The Alchemist", "Paulo Coelho", 1988);
        given(bookService.addBook(any(Book.class))).willReturn(book);

        mockMvc.perform(post("/api/books")
               .contentType(MediaType.APPLICATION_JSON)
               .content(objectMapper.writeValueAsString(book)))
               .andExpect(status().isOk())
               .andExpect(content().json(objectMapper.writeValueAsString(book)));
    }

    @Test
    public void testUpdateBookFound() throws Exception {
        Book updated = new Book("9780000000001", "The Odyssey Updated", "Homer", 2000);
        given(bookService.updateBook(eq("9780000000001"), any(Book.class))).willReturn(Optional.of(updated));

        mockMvc.perform(put("/api/books/{isbn}", "9780000000001")
               .contentType(MediaType.APPLICATION_JSON)
               .content(objectMapper.writeValueAsString(updated)))
               .andExpect(status().isOk())
               .andExpect(content().json(objectMapper.writeValueAsString(updated)));
    }

    @Test
    public void testUpdateBookNotFound() throws Exception {
        Book updated = new Book("99999", "Nonexistent", "No One", 2000);
        given(bookService.updateBook(eq("99999"), any(Book.class))).willReturn(Optional.empty());

        mockMvc.perform(put("/api/books/{isbn}", "99999")
               .contentType(MediaType.APPLICATION_JSON)
               .content(objectMapper.writeValueAsString(updated)))
               .andExpect(status().isNotFound());
    }

    @Test
    public void testDeleteBookFound() throws Exception {
        given(bookService.deleteBook("9780000000001")).willReturn(true);

        mockMvc.perform(delete("/api/books/{isbn}", "9780000000001"))
               .andExpect(status().isOk());
    }

    @Test
    public void testDeleteBookNotFound() throws Exception {
        given(bookService.deleteBook("99999")).willReturn(false);

        mockMvc.perform(delete("/api/books/{isbn}", "99999"))
               .andExpect(status().isNotFound());
    }
}
