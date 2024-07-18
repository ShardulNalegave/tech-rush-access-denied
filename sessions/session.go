package sessions

import "encoding/json"

type Session struct {
	SessionID string `json:"session_id"`
	UserID    uint64 `json:"user_id"`
}

func (s *Session) ToJSON() []byte {
	data, _ := json.Marshal(s)
	return data
}

func SessionFromJSON(data []byte) (*Session, error) {
	var s Session
	if err := json.Unmarshal(data, &s); err != nil {
		return nil, err
	}

	return &s, nil
}
