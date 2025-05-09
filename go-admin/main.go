package main

import (
	"fmt"
	"go-admin/core"
	"go-admin/global"
)

func main() {
	global.GVA_VP = core.Viper()

	fmt.Print(global.GVA_VP)
}
