// A basic HTTP server.
// By default, it serves the current working directory on port 8080.
package main

import (
	"log"
	"net/http"
)

func main() {
	log.Printf("listening on %s...", "8000")
	mux := http.NewServeMux()

	mux.Handle("/", http.FileServer(http.Dir("./build")))
	err := http.ListenAndServe(":8000", mux)
	log.Fatalln(err)
}
