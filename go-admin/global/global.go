package global

import (
	"go-admin/config"

	"github.com/spf13/viper"
)

var (
	GVA_VP     *viper.Viper
	GVA_CONFIG config.Server
)
