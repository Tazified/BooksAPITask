package com.java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.model.Book;
import com.java.repository.BookRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> getBookByIsbn(String isbn) {
        return bookRepository.findById(isbn);
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public Optional<Book> updateBook(String isbn, Book updatedBook) {
        return bookRepository.findById(isbn).map(book -> {
            book.setTitle(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setPublicationYear(updatedBook.getPublicationYear());
            return bookRepository.save(book);
        });
    }

    public boolean deleteBook(String isbn) {
        if (bookRepository.existsById(isbn)) {
            bookRepository.deleteById(isbn);
            return true;
        } else {
            return false;
        }
    }
}
