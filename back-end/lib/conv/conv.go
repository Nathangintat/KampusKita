package conv

import (
	"golang.org/x/crypto/bcrypt"
	"strconv"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func StringToInt64(s string) (int64, error) {
	newData, err := strconv.ParseInt(s, 10, 64)
	if err != nil {
		return 0, err
	}

	return newData, nil
}

func StringToInt(s string) (int, error) {
	numb, err := strconv.Atoi(s)
	if err != nil {
		return 0, err
	}
	return numb, nil
}
