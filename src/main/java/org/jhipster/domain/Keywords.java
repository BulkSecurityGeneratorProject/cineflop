package org.jhipster.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Keywords.
 */
@Entity
@Table(name = "keywords")
public class Keywords implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "keyword")
    private String keyword;

    @ManyToOne
    private Ideas ideas;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKeyword() {
        return keyword;
    }

    public Keywords keyword(String keyword) {
        this.keyword = keyword;
        return this;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Ideas getIdeas() {
        return ideas;
    }

    public Keywords ideas(Ideas ideas) {
        this.ideas = ideas;
        return this;
    }

    public void setIdeas(Ideas ideas) {
        this.ideas = ideas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Keywords keywords = (Keywords) o;
        if (keywords.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), keywords.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Keywords{" +
            "id=" + getId() +
            ", keyword='" + getKeyword() + "'" +
            "}";
    }
}
