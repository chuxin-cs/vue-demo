package main

import (
	"go-admin/core"
	"go-admin/global"
)

func main() {
	global.GVA_VP = core.Viper()
}
