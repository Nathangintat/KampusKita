package response

type ErrorResponseDefault struct {
	Meta
}

type Meta struct {
	Status  bool   `json:"status"`
	Message string `json:"message"`
}

type DefaultSuccessResponse struct {
	Meta Meta        `json:"meta"`
	Data interface{} `json:"data,omitempty"`
}
