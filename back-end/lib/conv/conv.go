package conv

import (
	"strconv"
)

func StringToInt64(s string) (int64, error) {
	newData, err := strconv.ParseInt(s, 10, 64)
	if err != nil {
		return 0, err
	}

	return newData, nil
}

func UintPtrToInt64(u *uint) *int64 {
	if u == nil {
		return nil
	}
	val := int64(*u)
	return &val
}

func Int64ToUintPtr(i *int64) *uint {
	if i == nil {
		return nil
	}
	val := uint(*i)
	return &val
}

func StringToInt(s string) (int, error) {
	numb, err := strconv.Atoi(s)
	if err != nil {
		return 0, err
	}
	return numb, nil
}
